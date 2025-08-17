"use client"

import { Modal, Button, message } from "antd"
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  WhatsAppOutlined,
  MailOutlined,
  LinkOutlined,
  RedditOutlined,
} from "@ant-design/icons"

const ShareModal = ({
  visible,
  onClose,
  url = window.location.href,
  title = document.title,
  description = "Check this out!",
}) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
  }

  const handleShare = (platform) => {
    const shareUrl = shareLinks[platform]

    if (platform === "email") {
      window.location.href = shareUrl
    } else {
      window.open(shareUrl, "_blank", "width=600,height=400,scrollbars=yes,resizable=yes")
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      message.success("Link copied to clipboard!")
    } catch (err) {
      message.error("Failed to copy link")
    }
  }

  const shareButtons = [
    {
      key: "facebook",
      icon: <FacebookOutlined />,
      label: "Facebook",
      color: "#1877F2",
      onClick: () => handleShare("facebook"),
    },
    {
      key: "twitter",
      icon: <TwitterOutlined />,
      label: "Twitter",
      color: "#1DA1F2",
      onClick: () => handleShare("twitter"),
    },
    {
      key: "linkedin",
      icon: <LinkedinOutlined />,
      label: "LinkedIn",
      color: "#0A66C2",
      onClick: () => handleShare("linkedin"),
    },
    {
      key: "whatsapp",
      icon: <WhatsAppOutlined />,
      label: "WhatsApp",
      color: "#25D366",
      onClick: () => handleShare("whatsapp"),
    },
    {
      key: "reddit",
      icon: <RedditOutlined />,
      label: "Reddit",
      color: "#FF4500",
      onClick: () => handleShare("reddit"),
    },
    {
      key: "email",
      icon: <MailOutlined />,
      label: "Email",
      color: "#EA4335",
      onClick: () => handleShare("email"),
    },
    {
      key: "copy",
      icon: <LinkOutlined />,
      label: "Copy Link",
      color: "#666666",
      onClick: handleCopyLink,
    },
  ]

  return (
    <Modal title="Share this content" open={visible} onCancel={onClose} footer={null} width={480} centered>
      <div className="py-4">
        <p className="text-gray-600 mb-6">Choose how you'd like to share:</p>

        <div className="grid grid-cols-2 gap-3">
          {shareButtons.map((button) => (
            <Button
              key={button.key}
              type="default"
              size="large"
              icon={button.icon}
              onClick={button.onClick}
              className="flex items-center justify-start h-12 text-left"
              style={{
                borderColor: button.color,
                color: button.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = button.color
                e.currentTarget.style.color = "white"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = button.color
              }}
            >
              <span className="ml-2">{button.label}</span>
            </Button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Sharing:</p>
          <p className="font-medium text-gray-800 truncate">{title}</p>
          <p className="text-sm text-gray-500 truncate">{url}</p>
        </div>
      </div>
    </Modal>
  )
}

export default ShareModal
