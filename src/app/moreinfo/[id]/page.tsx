"use client";
import React from "react";
import MoreInfo from "@/once-ui/components/custom/moreInfo";
interface PricingPageProps {
  params: {
    id: Number;
  };
}

export default function PricingPage({ params }: PricingPageProps) {
  const { id } = params;

  if (!id) {
    return <div>Loading...</div>;
  }

  return <MoreInfo id={id} />;
}
