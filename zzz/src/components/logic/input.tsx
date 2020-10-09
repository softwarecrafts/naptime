import React, { FC, useState } from 'react'
import { PageProps } from 'gatsby'

const Input: FC<PageProps> = ({ Component, setInput }) => {
  const onChange = (event) => {
    setInput(event.target.value)
  }
  Component.props[`onChange`] = onChange
  // return <Component onChange={onChange} />
  return Component
}

export default Input
