import React, { useContext } from "react";
import { IsLoadingContext } from "../../contexts/isLoading";
import { ReturnedJsonType } from "../../types/json";

export type SendType = (path: string, body: any) => Promise<ReturnedJsonType>;

export default function Form({
  className,
  submitHandler,
  children,
}: {
  className?: string;
  submitHandler: (send: SendType) => void;
  children: React.ReactNode;
}) {
  // ********* getting the contexts *************** //
  const isLoadingContext = useContext(IsLoadingContext);

  // ********* getting the states from the contexts *************** //
  const setIsLoading = isLoadingContext.setIsLoading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitHandler(async (path: string, body: any) => {
      setIsLoading(true);
      const res = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      setIsLoading(false);

      const json = await res.json();
      return json;
    });
  };

  return (
    <form action="#" onSubmit={handleSubmit} className={`form ${className}`}>
      {children}
    </form>
  );
}
