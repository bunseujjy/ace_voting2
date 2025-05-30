"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../../../../@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { getDeviceId } from "@/utils/getDeviceId";

const Poster = ({ posterId }) => {
  const [choice, setChoice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    try {
      setLoading(true);
      if (!choice) {
        alert("Please select Yes or No before submitting.");
        return;
      }

      const deviceId = getDeviceId();

      const res = await fetch("/api/voting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, posterId, choice }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Vote failed.");
      } else {
        toast.success("Thank you for voting!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-2 lg:px-0">
      <Image
        src="/banner.jpg"
        width={1000}
        height={1000}
        alt="Voting banner"
        className="w-full h-full object-cover bg-center"
      />
      <div className="mt-10">
        <div className="w-full h-full">
          <h1 className="font-bold text-2xl">
            Children's Day Poster Exhibition (ACE Siem Reap)
          </h1>

          {/* Voting options */}
          <div className="px-4 py-5 rounded-lg border border-slate-400 mt-5">
            <h1 className="text-xl font-bold mb-4">
              បោះឆ្នោតឲ្យស្នាដៃសិស្សក្រុមទី {posterId}
            </h1>
            <h1 className="text-xl font-bold mb-4">
              Voting for Group {posterId}
            </h1>
            <div className="flex flex-col items-start space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Yes"
                  name="vote"
                  value="Yes"
                  checked={choice === "Yes"}
                  onChange={(e) => setChoice(e.target.value)}
                />
                <label htmlFor="Yes" className="pl-2">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="No"
                  name="vote"
                  value="No"
                  checked={choice === "No"}
                  onChange={(e) => setChoice(e.target.value)}
                />
                <label htmlFor="No" className="pl-2">
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button className="mt-6" onClick={handleVote} disabled={loading}>
            {loading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Poster;
