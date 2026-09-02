interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: PageContainerProps) {
  return (
    <div className={`flex flex-col mx-auto w-full rounded-2xl bg-bg-light p-10 ${className ?? ""}`}>
      {children}
    </div>
  );
}
