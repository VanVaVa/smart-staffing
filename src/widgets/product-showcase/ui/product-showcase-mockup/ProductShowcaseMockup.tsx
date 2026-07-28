import Image from "next/image";

import styles from "./ProductShowcaseMockup.module.css";

const DEVICE_SRC = "/landing/iPad Pro Space Gray.png";
const SCREEN_SRC = "/landing/Mockup.png";

export function ProductShowcaseMockup() {
  return (
    <figure className={styles["product-showcase-mockup"]}>
      <Image
        className={styles["product-showcase-mockup__device"]}
        src={DEVICE_SRC}
        alt=""
        width={1168}
        height={1528}
        sizes="(max-width: 768px) 100vw, 1168px"
        priority
        aria-hidden
      />
      <div className={styles["product-showcase-mockup__screen-slot"]}>
        <Image
          className={styles["product-showcase-mockup__screen"]}
          src={SCREEN_SRC}
          alt="Интерфейс платформы СмартСтаффинг"
          width={1427}
          height={1068}
          sizes="(max-width: 768px) 88vw, 914px"
        />
      </div>
    </figure>
  );
}
