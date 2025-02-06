import React from "react";

export default function MapHotelFilter() {
  return (
    <div className="w-full rounded-b-2xl rounded-t-xl border shadow-md">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7303.812755526995!2d90.41948726319886!3d23.7507177691414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1738214286193!5m2!1sen!2sbd"
        width={"100%"}
        height={200}
        style={{
          border: 0,
          borderTopLeftRadius: "0.75rem",
          borderTopRightRadius: "0.75rem",
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <button className="block w-full rounded-b-2xl py-2.5 text-base text-p1 hover:text-p1/85">
        View in Map
      </button>
    </div>
  );
}
