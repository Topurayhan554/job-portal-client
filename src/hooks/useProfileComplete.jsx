import useAuth from "./useAuth";

const useProfileComplete = () => {
  const { user } = useAuth();

  if (!user) return { percent: 0, tasks: [], incomplete: [] };

  const tasks = [
    { label: "Add profile photo", done: !!user.profilePhoto },
    { label: "Add phone number", done: !!user.phone },
    { label: "Write a bio", done: !!user.bio },
    { label: "Add location", done: !!user.location },
    ...(user.role === "seeker"
      ? [
          { label: "Add skills", done: (user.skills || []).length > 0 },
          { label: "Add experience", done: (user.experience || []).length > 0 },
          { label: "Add education", done: (user.education || []).length > 0 },
          { label: "Upload CV", done: !!user.cvUrl },
        ]
      : []),
    ...(user.role === "employer"
      ? [
          { label: "Add company name", done: !!user.companyName },
          { label: "Add company website", done: !!user.companyWebsite },
          { label: "Add company bio", done: !!user.companyBio },
        ]
      : []),
  ];

  const done = tasks.filter((t) => t.done).length;
  const percent = Math.round((done / tasks.length) * 100);
  const incomplete = tasks.filter((t) => !t.done);

  return { percent, tasks, incomplete };
};

export default useProfileComplete;
