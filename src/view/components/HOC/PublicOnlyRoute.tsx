import React, { FC } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, Redirect, RouteProps } from "react-router-dom"

export interface IPrivateRouteProps extends RouteProps {
  state: any
  render?: any
  component?: any
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = props => {
  const { token } = props.state.auth_reducer
  return token ? <Route {...props} component={props.component} render={props.render} /> : <Redirect to="/" />
}
