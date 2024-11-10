import React from "react";
import Image from "next/image";
import loginImage from "../../public/login-image.jpeg"; // Verifique se a imagem está realmente nesta pasta

const LoginImage: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={loginImage}
        alt="Imagem de Login"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        className="rounded-l-lg"
      />
    </div>
  );
};

export default LoginImage;
