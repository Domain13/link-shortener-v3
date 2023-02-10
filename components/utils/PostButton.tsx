import React, { useContext } from "react";
import { IsLoadingContext } from "../../contexts/isLoading";
import { ReturnedJsonType } from "../../types/json";

export default function PostButton({
  path,
  body,
  afterPost,
  children,
  className,
  id,
  extra,
}: {
  path: string;
  body: any;
  afterPost: (json: ReturnedJsonType, body: any) => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
  extra?: any;
}) {
  const isLoadingContext = useContext(IsLoadingContext);
  const setIsLoading = isLoadingContext.setIsLoading;

  const handleClick = async () => {
    setIsLoading(true);
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    afterPost(json, body);

    setIsLoading(false);
  };

  return (
    <button onClick={handleClick} {...extra} className={className} id={id}>
      {children}
    </button>
  );
}
