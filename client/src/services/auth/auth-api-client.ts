import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate , useLocation } from "react-router";
import { useMutation , useQuery, useQueryClient} from "@tanstack/react-query";
import apiClient from "../api-client";
import type { ErrorResponse } from "@/types/api.type";
import { showValidationError } from "@/lib/showValidationErrors";

/*---------------- api fetch ------------------*/ 
export const fetchLogin = async (formdata: unknown) => {
        const response = await apiClient.post("/auth/login", formdata);
        if(!response.data) {
            throw new Error("Login failed");
        }
        return response.data;
}
export const fetchRegister = async (formdata: unknown) => {
        const response = await apiClient.post("/auth/register", formdata);
        if(!response.data) {
            throw new Error("Registration failed"); 
        }
        return response.data;
}
export const fetchLogout = async () => {
        const response = await apiClient.post("/auth/logout");
        if(!response.data) {
            throw new Error("Logout failed");
        } 
        return response.data;
}
export const fetchForgotPassword = async (formdata: {email : string} | unknown) => {
        const response = await apiClient.post("/auth/forgot-password", formdata);
        if(!response.data) {
            throw new Error("Login failed");
        }
        return response.data;
}
export const fetchResetPassword = async (formdata: {password : string; resetToken : string}) => {
        const response = await apiClient.post("/auth/reset-password", formdata);
        if(!response.data) {
            throw new Error("Login failed");
        }
        return response.data;
}
export const fetchvalidateToken = async () => {
        const response = await apiClient.get("/auth/validate-token");
        if(!response.data) {
            throw new Error("Token Validation failed");
        }
        return response.data;
}
export const fetchCurrentUser = async () => {
        const response = await apiClient.get("/auth/me");
        if(!response.data) {
            throw new Error("User fetch failed");
        }
        return response.data;
}

/*---------------- api hooks ------------------*/ 
export const useUser = () => {
return useQuery({
    queryKey : ["user"],
    queryFn : fetchvalidateToken,
    retry : false, // don't retry if unauthorized
})
}
export const useCurrentUser = () => {
return useQuery({
    queryKey : ["fetchCurrentUser"],
    queryFn : fetchCurrentUser,
    retry : false, 
})
}

export const useLogin = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const from = (location.state as { from?: Location })?.from?.pathname || "/";

    return useMutation({
        mutationFn : fetchLogin,
        onSuccess: async (data) => {
            toast.success(data.message);
            // Wait for the 'user' query to be refetched and settled.
            await queryClient.refetchQueries({ queryKey: ["user"] });
            navigate(from, {replace : true})
            // Refresh user data after login
            // queryClient.invalidateQueries({ queryKey: ["user"]});
        },
        onError: (error : AxiosError<ErrorResponse>) => {
           showValidationError(error)
        },
    })
}

export const useRegister = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : fetchRegister,
        onSuccess: (data) => {
            toast.success(data.message);
            if(data.success) {
                navigate("/login")
            }
            // Refresh user data after login
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
              showValidationError(error);
        },
    })
}

export const useForgotPassword = () => {
    return useMutation({
        mutationFn : fetchForgotPassword,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
              showValidationError(error);
        },
    })

}
export const useResetPassword = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn : fetchResetPassword,
        onSuccess: (data) => {
            toast.success(data.message);
            if(data.success) navigate("/login")
        },
        onError: (error) => {
              showValidationError(error);
        },
    })

}

export const useLogout = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : fetchLogout,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.setQueryData(["user"], null); 
            if(data.success){
                // clear user cache
                navigate("/login")
            }
        },
        onError: (error) => {
              showValidationError(error);
        },
    })

}