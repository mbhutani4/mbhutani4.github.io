import { CSSProperties, FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import usePrevious from "helpers/usePrevious";

const INTERVAL_DURATION = 10000; //milliseconds

interface CrossFadeProps {
  name: string;
  images: string[];
}

interface CrossFadeImageProps {
  name: string;
  src?: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    opacity: var(--opacity, 0);
    transition: opacity 1s ease 0s;
  }
`;

const CrossFadeImage: FC<CrossFadeImageProps> = ({ name, src }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [opacity, setOpacity] = useState(1);
  const previousSrc = usePrevious(currentSrc);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentSrc !== previousSrc) {
      setOpacity(0.5);
      timeout = setTimeout(() => setOpacity(1), 300);
    }
    return () => clearTimeout(timeout);
  }, [currentSrc]);

  return (
    <Container
      className="CrossFadeImage"
      style={{ "--opacity": opacity } as CSSProperties}
    >
      {currentSrc && (
        <Image
          className="top"
          src={currentSrc}
          layout="fill"
          objectFit="cover"
          loading="lazy"
          quality="100"
          alt={name}
        />
      )}
      {previousSrc && (
        <Image
          key={"old-" + previousSrc}
          className="bottom"
          src={previousSrc}
          layout="fill"
          objectFit="cover"
          loading="lazy"
          quality="100"
        />
      )}
    </Container>
  );
};

const CrossFade: FC<CrossFadeProps> = ({ images, name }) => {
  const imageCount = images.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % imageCount);
    }, INTERVAL_DURATION);
    return () => clearInterval(interval);
  }, []);

  return <CrossFadeImage src={images[index]} name={name} />;
};

export default CrossFade;
