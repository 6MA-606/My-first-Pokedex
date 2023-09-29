import PropTypes from "prop-types"
import { GitHub } from "./Icon"

export const GitHubAccount = (props) => {
  const { className, username } = props

  const handleClick = (e) => {
    e.preventDefault()
    window.open(`https://github.com/${username}`, "_blank")
  }

  return (
    <div
      className={`${className} cursor-pointer text-neutral-300 font-semibold flex items-center gap-2`}
      onClick={handleClick}
    >
      <GitHub />
      {props.children || username}
    </div>
  )
}

GitHubAccount.propTypes = {
  className: PropTypes.string,
  username: PropTypes.string.isRequired,
  children: PropTypes.node,
}
