import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import WhatsappLogo from "../public/whatsapp.png";

export default function AdminInfo() {
  return (
    <div className="admin-info">
      <Marquee gradient={false} speed={100} className="scroll">
        শর্টনার এবং যে কোনো আপডেট এর জন্য নিচের Whatsapp নাম্বারে যোগাযোগ
        করুন...
      </Marquee>

      <a href="tel:+8801660037359" className="phone">
        <Image height={25} width={25} src={WhatsappLogo} alt="Whatsapp icon" />
        <p className="number">০১৬৬০০৩৭৩৫৯</p>
      </a>
    </div>
  );
}
