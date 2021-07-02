import React, { FC } from 'react'
import { PageProps } from 'gatsby'

const OnboardingTitle: FC<PageProps> = ({ title, children }) => {
  return (
    <div>
      <img className="h-12 w-auto" src="/img/logos/logo.svg" alt="naptime" />
      <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">{title}</h2>
      {children}
    </div>
  )
}

const OnboardingShell: FC<PageProps> = ({ sidebar, image, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <OnboardingTitle title={title}>{subtitle}</OnboardingTitle>

          <div className="mt-8">{sidebar}</div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img className="absolute inset-0 h-full w-full object-cover" src={image} alt="" />
      </div>
    </div>
  )
}

export default OnboardingShell
