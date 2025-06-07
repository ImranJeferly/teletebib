"use client";

import React from 'react';

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  if (!content) return null;

  // Parse and render the formatted content
  const renderFormattedContent = (text: string) => {
    // Split into paragraphs first (double newlines)
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
      if (!paragraph.trim()) return null;
        // Check if paragraph is wrapped in center tags
      const centerMatch = paragraph.match(/^<center>\s*(.*?)\s*<\/center>$/);
      if (centerMatch) {
        return (
          <div key={pIndex} className="text-center my-4">
            {renderInlineFormatting(centerMatch[1])}
          </div>
        );
      }
      
      // Check if paragraph contains bullet points
      const lines = paragraph.split('\n');
      const isBulletList = lines.some(line => line.trim().startsWith('• '));
      
      if (isBulletList) {
        const listItems = lines
          .filter(line => line.trim().startsWith('• '))
          .map((line, lIndex) => (
            <li key={lIndex} className="ml-6 mb-2">
              {renderInlineFormatting(line.replace(/^\s*•\s*/, ''))}
            </li>
          ));
        
        return (
          <ul key={pIndex} className="list-disc list-outside mb-4 space-y-2">
            {listItems}
          </ul>
        );
      }
      
      // Regular paragraph
      return (
        <p key={pIndex} className="mb-4 leading-relaxed">
          {renderInlineFormatting(paragraph)}
        </p>
      );
    }).filter(Boolean);
  };
  // Render inline formatting (bold, italic)
  const renderInlineFormatting = (text: string): React.ReactNode[] => {
    // First, process bold text (**text**)
    const boldParts = text.split(/(\*\*.*?\*\*)/);
    
    return boldParts.map((boldPart, boldIndex) => {
      if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
        const boldText = boldPart.slice(2, -2);
        // Process italic within bold text
        return renderItalicText(boldText, `bold-${boldIndex}`, true);
      } else {
        // Process italic in non-bold text
        return renderItalicText(boldPart, `normal-${boldIndex}`, false);
      }
    });
  };

  // Helper function to render italic text
  const renderItalicText = (text: string, keyPrefix: string, isBold: boolean): React.ReactNode => {
    const italicParts = text.split(/(\*[^*]+?\*)/);
    
    if (italicParts.length === 1) {
      // No italic text found
      return isBold ? (
        <strong key={keyPrefix} className="font-semibold">{text}</strong>
      ) : text;
    }

    const processedParts = italicParts.map((italicPart, italicIndex) => {
      if (italicPart.startsWith('*') && italicPart.endsWith('*') && italicPart.length > 2) {
        const italicText = italicPart.slice(1, -1);
        if (isBold) {
          return (
            <strong key={`${keyPrefix}-italic-${italicIndex}`} className="font-semibold">
              <em className="italic">{italicText}</em>
            </strong>
          );
        } else {
          return <em key={`${keyPrefix}-italic-${italicIndex}`} className="italic">{italicText}</em>;
        }
      } else {
        return isBold ? (
          <strong key={`${keyPrefix}-text-${italicIndex}`} className="font-semibold">{italicPart}</strong>
        ) : italicPart;
      }
    });

    return <React.Fragment key={keyPrefix}>{processedParts}</React.Fragment>;
  };

  return (
    <div className={`rich-text-content ${className}`}>
      {renderFormattedContent(content)}
    </div>
  );
}
