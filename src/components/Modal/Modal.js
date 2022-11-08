import React from "react";

const Modal = (props) => {
  const { className, open, setOpen, children, ...rest } = props;

  return (
    <div
      id="modal"
      {...rest}
      className={`${
        open ? " scale-100 opacity-100 visible" : " scale-0 opacity-0 invisible"
      } fixed inset-0 z-[2] flex items-center justify-center transition-all duration-300`}
    >
      <div
        className="absolute top-0 left-0 h-screen w-screen bg-[#131313d5] z-[0]"
        onClick={() => setOpen(false)}
      />
      {children}
    </div>
  );
};

export default Modal;
