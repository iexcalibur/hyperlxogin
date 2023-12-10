import Container from "./Container";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-rose-500 z-10 shadow-sm">
      <Container>
        <div className="py-4">
          <div className="flex flex-row items-center justify-between">
            {/* Left Side - Footer Text */}
            <div className="text-white">
              © 2023 Impact Hub. All rights reserved.
            </div>

            {/* Right Side - Footer Links */}
            <div className="flex flex-row gap-4">
              <a href="/" className="text-white">
                FAQ
              </a>
              <a href="/" className="text-white ">
                Support
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
