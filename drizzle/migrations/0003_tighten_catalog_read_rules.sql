DROP POLICY IF EXISTS assessments_read ON public.assessments;
CREATE POLICY assessments_read ON public.assessments FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
REVOKE SELECT ON public.assessments FROM anon;
DROP POLICY IF EXISTS mentors_read ON public.mentors;
CREATE POLICY mentors_read ON public.mentors FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
REVOKE SELECT ON public.mentors FROM anon;
DROP POLICY IF EXISTS skill_read ON public.skills;
CREATE POLICY skill_read ON public.skills FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
REVOKE SELECT ON public.skills FROM anon;
DROP POLICY IF EXISTS tasks_read ON public.readiness_tasks;
CREATE POLICY tasks_read ON public.readiness_tasks FOR SELECT TO authenticated USING (auth.uid() IS NOT NULL);
REVOKE SELECT ON public.readiness_tasks FROM anon;
DROP POLICY IF EXISTS companies_read ON public.employer_profiles;
CREATE POLICY companies_read ON public.employer_profiles FOR SELECT TO anon, authenticated USING (
  user_id = auth.uid()
  OR public.has_role(auth.uid(),'admin')
  OR EXISTS (SELECT 1 FROM public.opportunities o WHERE o.employer_id = employer_profiles.user_id AND o.status = 'published' AND NOT o.demo)
);