CREATE TABLE public.employer_requests(user_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE, status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Approved','Declined')), created_at timestamptz NOT NULL DEFAULT now(), reviewed_by uuid, reviewed_at timestamptz);
GRANT SELECT ON public.employer_requests TO authenticated;
GRANT ALL ON public.employer_requests TO service_role;
ALTER TABLE public.employer_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY employer_requests_read ON public.employer_requests FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.new_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN
INSERT INTO public.profiles(id,name) VALUES(NEW.id,coalesce(NEW.raw_user_meta_data->>'name',''));
INSERT INTO public.user_roles(user_id,role) VALUES(NEW.id,'talent'::public.app_role);
IF NEW.raw_user_meta_data->>'account_type'='employer' THEN INSERT INTO public.employer_requests(user_id) VALUES(NEW.id) ON CONFLICT DO NOTHING; END IF;
RETURN NEW; END $$;

CREATE OR REPLACE FUNCTION public.review_employer(applicant uuid, approved boolean) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN
IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Administrator access required'; END IF;
UPDATE public.employer_requests SET status=CASE WHEN approved THEN 'Approved' ELSE 'Declined' END, reviewed_by=auth.uid(), reviewed_at=now() WHERE user_id=applicant AND status='Pending';
IF NOT FOUND THEN RAISE EXCEPTION 'No pending request'; END IF;
IF approved THEN INSERT INTO public.user_roles(user_id,role) VALUES(applicant,'employer') ON CONFLICT DO NOTHING; END IF;
INSERT INTO public.audit_logs(actor_id,action,record_id,details) VALUES(auth.uid(),'employer_review',applicant,jsonb_build_object('approved',approved));
END $$;
REVOKE ALL ON FUNCTION public.review_employer(uuid,boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.review_employer(uuid,boolean) TO authenticated;

CREATE OR REPLACE FUNCTION public.impact_counts() RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT jsonb_build_object('professionals',(SELECT count(*) FROM profiles),'assessments',(SELECT count(*) FROM assessment_attempts),'passports',(SELECT count(DISTINCT user_id) FROM credentials WHERE status='Reviewed by platform administrator'),'employers',(SELECT count(*) FROM user_roles WHERE role='employer'),'opportunities',(SELECT count(*) FROM opportunities WHERE NOT demo AND status='published'),'applications',(SELECT count(*) FROM applications),'mentorships',(SELECT count(*) FROM mentorship_requests),'placements',(SELECT count(*) FROM applications a JOIN opportunities o ON o.id=a.opportunity_id WHERE a.status='Hired' AND NOT o.demo AND o.employer_id IS NOT NULL AND o.employer_id<>a.talent_id AND public.has_role(o.employer_id,'employer'))) $$;

DROP POLICY IF EXISTS assessments_read ON public.assessments;
CREATE POLICY assessments_read ON public.assessments FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'talent') OR public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS skill_read ON public.skills;
CREATE POLICY skill_read ON public.skills FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'talent') OR public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS mentors_read ON public.mentors;
CREATE POLICY mentors_read ON public.mentors FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'talent') OR public.has_role(auth.uid(),'admin'));