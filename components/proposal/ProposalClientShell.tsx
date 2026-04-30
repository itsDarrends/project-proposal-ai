"use client";

import { useState } from "react";
import type { ProposalStatus } from "@/lib/supabase/types";
import { SignatureStep } from "./SignatureStep";
import { PaymentStep } from "./PaymentStep";
import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  proposalId: string;
  status: ProposalStatus;
  amount: number;
  appUrl: string;
  mockPayment?: boolean;
}

export function ProposalClientShell({ proposalId, status, amount, appUrl, mockPayment }: Props) {
  const [currentStatus, setCurrentStatus] = useState<ProposalStatus>(status);

  const pdfUrl = `${appUrl}/api/proposals/${proposalId}/pdf`;

  if (currentStatus === "paid") {
    return (
      <div className="mt-10 rounded-2xl bg-emerald-50 border border-emerald-100 p-8 text-center">
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Proposal Complete</h3>
        <p className="text-slate-500 text-sm mb-6">
          This proposal has been signed and payment has been received. Thank you!
        </p>
        <Button asChild variant="outline">
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            <Download className="w-4 h-4" />
            Download Signed Proposal
          </a>
        </Button>
      </div>
    );
  }

  if (currentStatus === "signed") {
    return (
      <PaymentStep
        proposalId={proposalId}
        amount={amount}
        pdfUrl={pdfUrl}
        mockPayment={mockPayment}
      />
    );
  }

  return (
    <SignatureStep
      proposalId={proposalId}
      onSigned={() => setCurrentStatus("signed")}
    />
  );
}
