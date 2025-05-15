import Link from "next/link";
import { useState } from "react";

interface ButtonProps {
  buttonText?: string;
  linkHref?: string;
  buttonWidth?: string;
  buttonHeight?: string;
  buttonOnClick?: () => void;
  buttonRadius?: string;
  buttonBorder?: string;
  buttonPadding?: string;
  buttonWeight?: string;
  buttonCursor?: string;
  buttonHoverColor?: string;
  textInButtonColor?: string;
  buttonBackgroundColor?: string;
}

export default function Buttons({
  buttonText = "Subscribe", // Default values
  linkHref = "/",
  buttonWidth = "",
  buttonHeight = "",
  buttonOnClick = () => null,
  buttonRadius = "6px",
  buttonBorder = "none",
  buttonPadding = "13px 30px",
  buttonWeight = "bold",
  buttonCursor = "pointer",
  buttonHoverColor = "var(--kindaOrange)",
  textInButtonColor = "var(--textColor2)",
  buttonBackgroundColor = "purple"
}: ButtonProps) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Link href={linkHref}>
        <button
          onClick={buttonOnClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: buttonWidth,
            height: buttonHeight,
            border: buttonBorder,
            borderRadius: buttonRadius,
            padding: buttonPadding,
            fontWeight: buttonWeight,
            cursor: buttonCursor,
            transition: "all 0.3s ease",
            backgroundColor: isHovered ? buttonHoverColor : buttonBackgroundColor,
            color: textInButtonColor,
            // background: buttonBackgroundColor,
          }}
        >
          {buttonText}
        </button>
      </Link>
    </>
  );
}
