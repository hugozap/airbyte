import { useModalService } from "hooks/services/Modal";
import { useAuthService } from "packages/cloud/services/auth/AuthService";
import { useStripeCheckout } from "packages/cloud/services/stripe/StripeService";
import { useCurrentWorkspaceId } from "services/workspaces/WorkspacesService";

import { EnrollmentModalContent } from "./EnrollmentModal";

export const useShowEnrollmentModal = () => {
  const { openModal, closeModal } = useModalService();
  const { mutateAsync: createCheckout } = useStripeCheckout();
  const workspaceId = useCurrentWorkspaceId();
  const { emailVerified, sendEmailVerification } = useAuthService();

  return {
    showEnrollmentModal: () => {
      openModal({
        title: null,
        content: () => (
          <EnrollmentModalContent
            workspaceId={workspaceId}
            createCheckout={createCheckout}
            closeModal={closeModal}
            emailVerified={emailVerified}
            sendEmailVerification={sendEmailVerification}
          />
        ),
      });
    },
  };
};
