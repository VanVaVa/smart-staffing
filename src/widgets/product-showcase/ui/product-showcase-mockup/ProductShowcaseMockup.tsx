import Image from "next/image";


import styles from "./ProductShowcaseMockup.module.css";

type ProductShowcaseMockupProps = {
  deviceSrc: string;
  screenSrc: string;
};

export function ProductShowcaseMockup({
  deviceSrc,
  screenSrc,
}: ProductShowcaseMockupProps) {
  return (
    <figure className={styles["product-showcase-mockup"]}>
      <div>
        <Image
          className={styles["product-showcase-mockup__device"]}
          src={deviceSrc}
          alt=""
          width={1168}
          height={1528}
          sizes="(max-width: 768px) 100vw, 1168px"
          priority
          aria-hidden
        />
      </div>
      <div className={styles["product-showcase-mockup__screen-slot"]}>
        <div>
          <Image
            className={styles["product-showcase-mockup__screen"]}
            src={screenSrc}
            alt="Интерфейс платформы СмартСтаффинг"
            width={1427}
            height={1068}
            sizes="(max-width: 768px) 88vw, 914px"
          />
        </div>
      </div>
    </figure>
  );
}
