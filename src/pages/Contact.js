import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Subject:", subject);
    console.log("Email:", email);
    console.log("Message:", message);
  };

  return (
    <div className="flex items-center justify-center min-h-[92vh] bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Contact Form</h2>

        <label htmlFor="name" className="block mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="w-full p-2 mb-4 border border-gray-200 rounded"
          value={name}
          minLength="3"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="subject" className="block mb-2">
          Subject:
        </label>
        <input
          type="text"
          id="subject"
          className="w-full p-2 mb-4 border border-gray-200 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          minLength={3}
          required
        />

        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-2 mb-4 border border-gray-200 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="message" className="block mb-2">
          Message:
        </label>
        <textarea
          id="message"
          className="w-full p-2 mb-4 border border-gray-200 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          minLength={3}
          required
        ></textarea>

        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
