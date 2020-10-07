import React, { FC } from "react"
import styled from "styled-components"
import { Google3 } from "@styled-icons/icomoon/Google3"
import { TwitterWithCircle } from "@styled-icons/entypo-social/TwitterWithCircle"
import { InstagramAlt } from "@styled-icons/boxicons-logos/InstagramAlt"
import { FacebookWithCircle } from "@styled-icons/entypo-social/FacebookWithCircle"

export interface SocialMediaIcons {
  handleChange: () => void
}

export const SocialMediaIcons: FC<SocialMediaIcons> = ({ handleChange }) => (
  <Wrapper>
    <Google />
    <Twitter />
    <Instagram />
    <Facebook />
  </Wrapper>
)

//---------------------------STYLES-------------------------------------------//

interface Props {}

const Wrapper = styled.div`
  height: 4.2rem;
  width: 22rem;
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`
const Google = styled(Google3)<Props>`
  color: ${props => props.theme.color.darkGrey};
  height: 3.4rem;
  width: 3.4rem;
`

const Twitter = styled(TwitterWithCircle)<Props>`
  color: ${props => props.theme.color.darkGrey};
  height: 3.4rem;
  width: 3.4rem;
`
const Instagram = styled(InstagramAlt)<Props>`
  color: ${props => props.theme.color.darkGrey};
  height: 3.4rem;
  width: 3.4rem;
`
const Facebook = styled(FacebookWithCircle)<Props>`
  color: ${props => props.theme.color.darkGrey};
  height: 3.4rem;
  width: 3.4rem;
`
