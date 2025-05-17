import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
  useQuery,
} from "@tanstack/react-query";

import axios from "axios";
//members hooks
//fetch members
export const useFetchMembers = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["members"],
    queryFn: async () => {
      return await axios.get("http://localhost:4000/members");
    },
    staleTime: 1000 * 60 * 5,
  });
  return { members: data };
};
export const useFetchMember = () => {
  const { data } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      return await axios.get("http://localhost:4000/members");
    },
    staleTime: 1000 * 60 * 5,
  });
  return { member: data };
};

//fetch member by id
export const useFetchMembersDetail = (id) => {
  const { data } = useSuspenseQuery({
    queryKey: ["members", id],
    queryFn: async () => {
      return await axios.get(`http://localhost:4000/members/${id}`);
    },
    staleTime: 1000 * 60 * 5,
  });
  return { memberDetails: data };
};

//add member
export const useAddMember = () => {
  const queryClient = useQueryClient();
  const { mutate: addMember } = useMutation({
    mutationFn: (newMember) => {
      return axios.post(`http://localhost:4000/members/`, newMember);
    },
    onMutate: (newMember) => {
      queryClient.cancelQueries(["members"]);
      const prevPostData = queryClient.getQueryData(["members"]);
      queryClient.setQueryData(["members"], (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, { ...newMember }],
        };
      });
      return {
        prevPostData,
      };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["members"], context.prevPostData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });

  return { addMember };
};

//edit member
export const useEditMember = (id) => {
  const queryClient = useQueryClient();
  const { mutateAsync: editMember } = useMutation({
    mutationFn: (updatedMember) =>
      axios.put(`http://localhost:4000/members/${id}`, updatedMember, {
        headers: { "Content-Type": "application/json" },
      }),
    onMutate: async (updatedMember) => {
      await queryClient.cancelQueries(["members", id]);
      await queryClient.cancelQueries(["members"]);

      const prevMemberData = queryClient.getQueryData(["members", id]);
      const prevMembersData = queryClient.getQueryData(["members"]);

      if (prevMemberData) {
        queryClient.setQueryData(["members", id], {
          ...prevMemberData,
          ...updatedMember,
        });
      }

      if (prevMembersData) {
        if (prevMembersData.data && Array.isArray(prevMembersData.data)) {
          queryClient.setQueryData(["members"], {
            ...prevMembersData,
            data: prevMembersData.data.map((member) =>
              member.id === id ? { ...member, ...updatedMember } : member
            ),
          });
        } else if (Array.isArray(prevMembersData)) {
          queryClient.setQueryData(
            ["members"],
            prevMembersData.map((member) =>
              member.id === id ? { ...member, ...updatedMember } : member
            )
          );
        }
      }

      return { prevMemberData, prevMembersData };
    },

    onError: (_error, _vars, context) => {
      if (context?.prevMemberData) {
        queryClient.setQueryData(["members", id], context.prevMemberData);
      }
      if (context?.prevMembersData) {
        queryClient.setQueryData(["members"], context.prevMembersData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["members", id]);
      queryClient.invalidateQueries(["members"]);
    },
  });

  return { editMember };
};

//delete member
export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteMember } = useMutation({
    mutationFn: (memberId) => {
      return axios.delete(`http://localhost:4000/members/${memberId}`);
    },
    onMutate: (memberId) => {
      queryClient.cancelQueries(["members"]);
      const prevPostData = queryClient.getQueryData(["members"]);
      queryClient.setQueryData(["members"], (oldData) => {
        return {
          ...oldData,
          data: oldData.data.filter((member) => member.id !== memberId),
        };
      });
      return {
        prevPostData,
      };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["members"], context.prevPostData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });

  return { deleteMember };
};

//trainers hook
export const useFetchTrainers = () => {
  //fetch trainers
  const { data } = useSuspenseQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      return await axios.get("http://localhost:4000/trainers");
    },
    staleTime: 1000 * 60 * 5,
  });

  return { trainers: data };
};
export const useFetchTrainerDetails = (id) => {
  //fetch trainers details
  const { data } = useSuspenseQuery({
    queryKey: ["trainers", id],
    queryFn: async () => {
      return await axios.get(`http://localhost:4000/trainers/${id}`);
    },
    staleTime: 1000 * 60 * 5,
  });

  return { trainerDetails: data };
};

//add trainer
export const useAddTrainer = () => {
  const queryClient = useQueryClient();
  const { mutate: addTrainer } = useMutation({
    mutationFn: (newTrainer) => {
      return axios.post(`http://localhost:4000/trainers/`, newTrainer);
    },
    onMutate: (newTrainer) => {
      queryClient.cancelQueries(["trainers"]);
      const prevPostData = queryClient.getQueryData(["trainers"]);
      queryClient.setQueryData(["trainers"], (oldData) => {
        return {
          ...oldData,
          data: [...(oldData?.data || []), { ...newTrainer }],
        };
      });
      return {
        prevPostData,
      };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["trainers"], context.prevPostData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["trainers"]);
    },
  });

  return { addTrainer };
};

//edit trainer
export const useEditTrainer = (id) => {
  const queryClient = useQueryClient();
  const { mutateAsync: editTrainer } = useMutation({
    mutationFn: (newTrainer) =>
      axios.put(`http://localhost:4000/trainers/${id}`, newTrainer, {
        headers: { "Content-Type": "application/json" },
      }),
    onMutate: async (newTrainer) => {
      await queryClient.cancelQueries(["trainers", id]);
      await queryClient.cancelQueries(["trainers"]);

      const prevTrainerData = queryClient.getQueryData(["trainers", id]);
      const prevTrainersData = queryClient.getQueryData(["trainers"]);

      if (prevTrainerData) {
        queryClient.setQueryData(["trainers", id], {
          ...prevTrainerData,
          ...newTrainer,
        });
      }

      const trainerList = Array.isArray(prevTrainersData)
        ? prevTrainersData
        : Array.isArray(prevTrainersData?.data)
        ? prevTrainersData.data
        : [];

      if (trainerList.length > 0) {
        const updatedTrainers = trainerList.map((trainer) =>
          trainer.id === id ? { ...trainer, ...newTrainer } : trainer
        );

        if (Array.isArray(prevTrainersData)) {
          queryClient.setQueryData(["trainers"], updatedTrainers);
        } else {
          queryClient.setQueryData(["trainers"], {
            ...prevTrainersData,
            data: updatedTrainers,
          });
        }
      }

      return { prevTrainerData, prevTrainersData };
    },

    onError: (_error, _vars, context) => {
      if (context?.prevTrainerData) {
        queryClient.setQueryData(["trainers", id], context.prevTrainerData);
      }
      if (context?.prevTrainersData) {
        queryClient.setQueryData(["trainers"], context.prevTrainersData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["trainers", id]);
      queryClient.invalidateQueries(["trainers"]);
    },
  });

  return { editTrainer };
};

//delete trainer
export const useDeleteTrainer = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTrainer } = useMutation({
    mutationFn: (trainerId) => {
      return axios.delete(`http://localhost:4000/trainers/${trainerId}`);
    },
    onMutate: (trainerId) => {
      queryClient.cancelQueries(["trainers"]);
      const prevPostData = queryClient.getQueryData(["trainers"]);
      queryClient.setQueryData(["trainers"], (oldData) => {
        return {
          ...oldData,
          data: oldData.data.filter((trainer) => trainer.id !== trainerId),
        };
      });
      return {
        prevPostData,
      };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["trainers"], context.prevPostData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["trainers"]);
    },
  });

  return { deleteTrainer };
};

//admins hook
export const useFetchAdmins = () => {
  //fetch admins
  const { data } = useSuspenseQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      return await axios.get("http://localhost:4000/admins");
    },
    staleTime: 1000 * 60 * 5,
  });

  return { admins: data };
};

//edit admin
export const useEditAdmin = (id) => {
  const queryClient = useQueryClient();
  const { mutateAsync: editAdmin } = useMutation({
    mutationFn: (newAdmin) =>
      axios.put(`http://localhost:4000/admins/${id}`, newAdmin, {
        headers: { "Content-Type": "application/json" },
      }),
    onMutate: async (newAdmin) => {
      await queryClient.cancelQueries(["admins", id]);
      await queryClient.cancelQueries(["admins"]);

      const prevAdminData = queryClient.getQueryData(["admins", id]);
      const prevAllAdminsData = queryClient.getQueryData(["admins"]);

      if (prevAdminData) {
        queryClient.setQueryData(["admins", id], {
          ...prevAdminData,
          ...newAdmin,
        });
      }

      const adminList = Array.isArray(prevAllAdminsData)
        ? prevAllAdminsData
        : Array.isArray(prevAllAdminsData?.data)
        ? prevAllAdminsData.data
        : [];

      if (adminList.length > 0) {
        const updatedAdmins = adminList.map((admin) =>
          admin.id === id ? { ...admin, ...newAdmin } : admin
        );

        if (Array.isArray(prevAllAdminsData)) {
          queryClient.setQueryData(["admins"], updatedAdmins);
        } else {
          queryClient.setQueryData(["admins"], {
            ...prevAllAdminsData,
            data: updatedAdmins,
          });
        }
      }

      return { prevAdminData, prevAllAdminsData };
    },

    onError: (_error, _vars, context) => {
      if (context?.prevAdminData) {
        queryClient.setQueryData(["admins", id], context.prevAdminData);
      }
      if (context?.prevAdminsData) {
        queryClient.setQueryData(["admins"], context.prevAdminsData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["admins", id]);
      queryClient.invalidateQueries(["admins"]);
    },
  });

  return { editAdmin };
};

//rewards hook
export const useFetchRewards = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["rewards"],
    queryFn: async () => {
      return await axios.get("http://localhost:4000/rewards");
    },
    staleTime: 1000 * 60 * 5,
  });

  return { rewards: data };
};
