import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SocialButton({ icon, url }) {
  return (
    <Link
      to={url}
      className={`background relative h-7 w-7 rounded-full bg-indigo-500`}
    >
      <FontAwesomeIcon
        icon={icon}
        className={`absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 transform text-sm text-white`}
      />
    </Link>
  );
}

SocialButton.propTypes = {
  icon: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};
