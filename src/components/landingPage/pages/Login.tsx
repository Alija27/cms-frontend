import React from 'react'
import ResponsiveLayout from '../../shared/responsiveLayout/ResponsiveLayout'
import TextFields from '../../shared/inputs/TextFields'
import Buttons from '../../shared/buttons/Buttons'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { login } from '../../../app/feature/Auth/AuthApi'


const Login = () => {

  const dispatch = useAppDispatch();

  const authState = useAppSelector((store) => store.AuthSlice);

  const { register, handleSubmit, formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
      })
      
    ),
  })

  const onsubmit = async (data:any) => {
    await dispatch(login(data));
  };
  return (
    <div>
      <ResponsiveLayout>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold text-center  font-serif text-gray-500">
            Sign in to your account
          </div>
          {/* <div className="text-xs w-full text-center text-blue-500">Don't have an account ? Sign up</div> */}

          <div className="flex flex-col">
            <form className="flex flex-col gap-6 " onSubmit={handleSubmit(onsubmit)}>
              <TextFields
              register={register}
                error={errors?.email?.message}
                name="email"
                type="email"
                placeholder="Enter your email here"
                 label="Email"
              />
              <TextFields
              register={register}
                error={errors?.password?.message}
                name="password"
                type="password"
                placeholder="Enter your password here"
                 label="Password"
              />
              {/* <div className="flex gap-4 justify-between">
                <div> <input type="checkbox" className="mr-1" />Remember me </div>
                <div>Forgot your Password?</div>
              </div> */}



              <Buttons text="Sign In" type="submit" className="w-full py-2 dashboardlink"/>










            </form>
          </div>
        </div>
      </ResponsiveLayout >
    </div >
  )
}

export default Login