import { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./modalStyle.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import userSubscriptionData from "../../../hooks/userSubscriptionStatus";
import Loading from "../../../loading";

interface ModalOpen {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ isModalOpen, setModalOpen }: ModalOpen) {
  const closeModal = () => {
    setModalOpen(false);
  };

  const {data: session} = useSession()
  const subscriptionStatus = userSubscriptionData();

  if (!session || !subscriptionStatus) return <Loading/>;

  return (
    <>
      <div className={styles.modalOverlay} onClick={closeModal}></div>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>You have an active subscription!</h2>
        </div>
        <div className={styles.modalContent}>
          <p>
            You currently have an active subscription. To upgrade or downgrade, please go to your dashboard, click the settings icon, & click manage subscription to cancel your current plan first.
          </p>
        </div>
        <div className={styles.modalFooter}>
          <button className={`${styles.button} ${styles.closeButton}`} type="button" onClick={closeModal}>
            Close
          </button>
          <Link href={`/dashboard/user/${session?.user.name}?subscription_type=${session?.user.subscriptionType}&subscription_status=${subscriptionStatus}`} > {/*Continue Here*/}
            <button className={`${styles.button} ${styles.dashboardButton}`} type="button" onClick={closeModal}>
                Visit Dashboard
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
