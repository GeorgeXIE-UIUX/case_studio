export const Footer = () => {
  return (
    <footer className="bg-background py-12">
      <div className="container px-6 mx-auto">
        <div className="flex justify-center items-center text-xs text-gray-600">
          <p>
            Copyright © {new Date().getFullYear()} Studio. 版權所有。
          </p>
        </div>
      </div>
    </footer>
  );
};