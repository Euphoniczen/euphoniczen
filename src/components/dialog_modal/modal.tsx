import { Dispatch, SetStateAction, useEffect } from "react";
import styles from "./modalStyle.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import userSubscriptionData from "../../../hooks/userSubscriptionStatus";
import Loading from "../../../loading";

interface ModalOpen {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  modalTitle?: string, 
  modalContent?: string
  modalActionButtonText?: string
  modalActionClick?: any
}

export default function Modal({ isModalOpen, setModalOpen,
                                modalTitle = "You have an active subscription!", 
                                modalContent = "You currently have an active subscription. To upgrade or downgrade, please go to your dashboard, click the settings icon, & click manage subscription to cancel your current plan first.",
                                modalActionButtonText = "Visit Dashboard",
                                // modalActionClick = "`/dashboard/user/${session?.user.name}?subscription_type=${session?.user.subscriptionType}&subscription_status=${subscriptionStatus}`"
                                modalActionClick = "/dashboard"
 }: ModalOpen) {
  const closeModal = () => {
    setModalOpen(false);
  };

  const {data: session} = useSession()
  const subscriptionStatus = userSubscriptionData();

  // if (!session || !subscriptionStatus) return <Loading/>;

  return (
    <>
      <div className={styles.modalOverlay} onClick={closeModal}></div>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{modalTitle}</h2>
        </div>
        <div className={styles.modalContent}>
          <p>
            {modalContent}
          </p>
        </div>
        <div className={styles.modalFooter}>
          <button className={`${styles.button} ${styles.closeButton}`} type="button" onClick={closeModal}>
            Close
          </button>
          <Link href={modalActionClick} > {/*Continue Here*/}
            <button className={`${styles.button} ${styles.dashboardButton}`} type="button" onClick={closeModal}>
                {modalActionButtonText}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
