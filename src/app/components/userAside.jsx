"use client";
import React from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { RowSpacingIcon, Cross2Icon } from "@radix-ui/react-icons";
import "./asideStyles.css";
import Image from "next/image";
import Link from "next/link";

const CollapsibleDemo = ({ myProfile, allUsers }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible.Root
      className="CollapsibleRoot"
      open={open}
      onOpenChange={setOpen}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="Text" style={{ color: "#8b6508" }}>
          User Profiles
        </span>
        <Collapsible.Trigger asChild>
          <button className="IconButton">
            {open ? <Cross2Icon /> : <RowSpacingIcon />}
          </button>
        </Collapsible.Trigger>
      </div>

      <div className="Repository">
        <Link href={`/${myProfile.clerk_id}`}>
          <Image
            className="rounded-full"
            src={myProfile.btn_image}
            alt={`${myProfile.username}&apos;s Avatar`}
            width={50}
            height={50}
          />
          <span className="Text">{myProfile.username}</span>
        </Link>
      </div>

      <Collapsible.Content>
        <>
          {allUsers.length === 0 ? (
            <p>No users found</p>
          ) : (
            allUsers.map((user) => (
              <div className="Repository" key={user.clerk_id}>
                <Link href={`/${user.clerk_id}`}>
                  <Image
                    className="rounded-full"
                    src={user.btn_image}
                    alt={`${user.username}&apos;s Avatar`}
                    width={50}
                    height={50}
                  />
                  <span className="Text">{user.username}</span>
                </Link>
              </div>
            ))
          )}
        </>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
export default CollapsibleDemo;
