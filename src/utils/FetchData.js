import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";

export const FetchMembers = () => {
  const {
    data: members,
    isLoading: loadingMembers,
    isError: isErrorMembers,
    error: errorMembers,
  } = useQuery({
    queryKey: ["members"],
    queryFn: () => {
      return axios.get("http://localhost:4000/members");
    },
  });

  return { members, loadingMembers, isErrorMembers, errorMembers };
};
export const FetchMembersDetail = (id) => {
  const {
    data: member,
    isLoading: loadingMember,
    isError: isErrorMember,
    error: errorMember,
  } = useQuery({
    queryKey: ["members"],
    queryFn: () => {
      return axios.get(`http://localhost:4000/members/${id}`);
    },
  });

  return { member, loadingMember, isErrorMember, errorMember };
};

export const FetchTrainers = () => {
  const {
    data: trainers,
    isLoading: loadingTrainers,
    isError: isErrorTrainers,
    error: errorTrainers,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: () => {
      return axios.get("http://localhost:4000/trainers");
    },
  });

  return { trainers, loadingTrainers, isErrorTrainers, errorTrainers };
};

//add member
export const AddMember = () => {
  const queryClient = useQueryClient();
  const { mutate: addMember } = useMutation({
    mutationFn: (newMember) => {
      return axios.post(`http://localhost:4000/members/`, newMember);
    },
    onMutate: async (newMember) => {
      await queryClient.cancelQueries(["members"]);
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

//add trainer
export const AddTrainer = () => {
  const queryClient = useQueryClient();
  const { mutate: addTrainer } = useMutation({
    mutationFn: (newTrainer) => {
      return axios.post(`http://localhost:4000/trainers/`, newTrainer);
    },
    onMutate: async (newTrainer) => {
      await queryClient.cancelQueries(["trainers"]);
      const prevPostData = queryClient.getQueryData(["trainers"]);
      queryClient.setQueryData(["trainers"], (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, { ...newTrainer }],
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

//delete member
export const DeleteMember = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteMember } = useMutation({
    mutationFn: (memberId) => {
      return axios.delete(`http://localhost:4000/members/${memberId}`);
    },
    onMutate: async (memberId) => {
      await queryClient.cancelQueries(["members"]);
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
      if (context?.prevData) {
        queryClient.setQueryData(["members"], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });

  return { deleteMember };
};

//delete trainer
export const DeleteTrainer = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTrainer } = useMutation({
    mutationFn: (trainerId) => {
      return axios.delete(`http://localhost:4000/trainers/${trainerId}`);
    },
    onMutate: async (trainerId) => {
      await queryClient.cancelQueries(["trainers"]);
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
      if (context?.prevData) {
        queryClient.setQueryData(["trainers"], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["trainers"]);
    },
  });

  return { deleteTrainer };
};
