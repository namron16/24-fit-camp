import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import axios from "axios";

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
export const useFetchPosts = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await axios.get("http://localhost:4000/posts");
    },
    staleTime: 1000 * 60 * 5,
  });

  return { posts: data };
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

export const useAddNewPost = () => {
  const queryClient = useQueryClient();
  const { mutate: addNewPost } = useMutation({
    mutationFn: (newPost) => {
      return axios.post(`http://localhost:4000/posts/`, newPost);
    },
    onMutate: (newPost) => {
      queryClient.cancelQueries(["posts"]);
      const prevPostData = queryClient.getQueryData(["posts"]);
      queryClient.setQueryData(["posts"], (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, { ...newPost }],
        };
      });
      return {
        prevPostData,
      };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["posts"], context.prevPostData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  return { addNewPost };
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
