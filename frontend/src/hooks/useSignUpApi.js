import useSWRMutation from "swr/mutation"
import { fetchRequest } from "../utils/request"

const signUpRequest = (key, { arg }) => {
  return fetchRequest(key, {
    method: 'POST',
    body: arg,
  })
}

export const useSignUpApi = () => {
  const SIGNUP_ENDPOINT = '/api/auth/signup/'

  const { data, trigger, isMutating, error } = useSWRMutation(SIGNUP_ENDPOINT, signUpRequest)
  return {
    data,
    trigger,
    isMutating,
    error,
  }
}

