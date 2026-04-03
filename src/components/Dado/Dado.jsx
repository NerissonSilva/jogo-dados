import Image from 'next/image';
import styles from './Dado.module.css';

export default function Dado({ valor }) {
  if (!valor || valor < 1 || valor > 6) {
    return <div className={styles.emptyDado} />;
  }

  return (
    <div className={styles.dadoContainer}>
      <Image
        src={`/dado-${valor}.svg`}
        alt={`Dado com valor ${valor}`}
        width={100}
        height={100}
        priority
        className={styles.image}
      />
    </div>
  );
}
