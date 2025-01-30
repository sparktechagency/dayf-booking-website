export const BedroomIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="18"
      fill="none"
      viewBox="0 0 16 18"
    >
      <path
        stroke="#626262"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.125"
        d="M2.75 16.5V6c0-2.121 0-3.182.659-3.841S5.129 1.5 7.25 1.5h1.5c2.121 0 3.182 0 3.841.659s.659 1.72.659 3.841v10.5z"
      ></path>
      <path
        stroke="#626262"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.125"
        d="M5 8.25v-3c0-1.241.259-1.5 1.5-1.5h3c1.241 0 1.5.259 1.5 1.5v3c0 1.241-.259 1.5-1.5 1.5h-3c-1.241 0-1.5-.259-1.5-1.5M1.25 16.5h13.5M8 3.75v6m3-3H5"
      ></path>
      <path
        stroke="#626262"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.006 12.75h-.007"
      ></path>
    </svg>
  );
};

export const BathroomIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="17"
      viewBox="0 0 19 17"
      fill="none"
    >
      <path
        d="M4.49935 14.6665L3.66602 15.4998M14.4993 14.6665L15.3327 15.4998"
        stroke="#626262"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2 8V8.83333C2 11.5832 2 12.9581 2.85427 13.8124C3.70854 14.6667 5.08347 14.6667 7.83333 14.6667H11.1667C13.9165 14.6667 15.2915 14.6667 16.1457 13.8124C17 12.9581 17 11.5832 17 8.83333V8"
        stroke="#626262"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1.16602 8H17.8327" stroke="#626262" strokeLinecap="round" />
      <path
        d="M2.83203 8V2.60284C2.83203 1.44147 3.7735 0.5 4.93487 0.5C5.86675 0.5 6.68748 1.11332 6.95153 2.00701L6.9987 2.16667"
        stroke="#626262"
        strokeLinecap="round"
      />
      <path
        d="M6.16602 3.00016L8.24935 1.3335"
        stroke="#626262"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const ExpandIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="#626262"
        d="M3.334 16.667h-.5v.5h.5zm4.52-3.814a.5.5 0 1 0-.707-.707zm-5.02-1.187v5h1v-5zm.5 5.5h5v-1h-5zm.354-.146 4.166-4.167-.707-.707-4.167 4.167zM16.666 3.334h.5v-.5h-.5zm-4.52 3.813a.5.5 0 1 0 .707.707zm5.02 1.187v-5h-1v5zm-.5-5.5h-5v1h5zm-.354.146-4.166 4.167.707.707 4.167-4.167z"
      ></path>
    </svg>
  );
};

export const MessageCircleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={25}
      width={25}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        id="SVGRepo_iconCarrier"
        stroke="#007dd0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21.004 12a9 9 0 0 1-9 9h-9s1.56-3.744.936-5a9 9 0 0 1 8.064-13m8.117.879A3 3 0 1 1 15.88 8.12 3 3 0 0 1 20.12 3.88"
      ></path>
    </svg>
  );
};

export const StarSharpIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1920"
      fill={props.fill || "none"}
      height={props.height || 20}
      width={props.width || 20}
    >
      <path
        id="SVGRepo_iconCarrier"
        fillRule="evenodd"
        d="M1915.918 737.475c-10.955-33.543-42.014-56.131-77.364-56.131h-612.029l-189.063-582.1v-.112C1026.394 65.588 995.335 43 959.984 43c-35.237 0-66.41 22.588-77.365 56.245L693.443 681.344H81.415c-35.35 0-66.41 22.588-77.365 56.131s.79 70.137 29.478 91.03l495.247 359.831-189.177 582.212c-10.955 33.657 1.13 70.25 29.817 90.918 14.23 10.278 30.946 15.487 47.66 15.487 16.716 0 33.432-5.21 47.775-15.6l495.134-359.718 495.021 359.718c28.574 20.781 67.087 20.781 95.662.113 28.687-20.668 40.658-57.261 29.703-91.03l-189.176-582.1 495.36-359.83c28.574-20.894 40.433-57.487 29.364-91.03"
      ></path>
    </svg>
  );
};
