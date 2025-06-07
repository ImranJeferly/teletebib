"use client";

import { useState, useRef, useCallback } from 'react';
import { Bold, Italic, List, AlignLeft, AlignCenter, AlignJustify, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Məzmun daxil edin...", 
  className = "",
  rows = 30 
}: RichTextEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Insert formatting at cursor position
  const insertFormatting = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  }, [value, onChange]);

  // Handle bullet points
  const insertBulletPoint = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lines = value.substring(0, start).split('\n');
    const currentLine = lines[lines.length - 1];
    
    // Check if we're at the beginning of a line or if current line is empty
    if (currentLine.trim() === '' || start === 0 || value[start - 1] === '\n') {
      insertFormatting('• ');
    } else {
      insertFormatting('\n• ');
    }
  }, [value, insertFormatting]);

  // Handle line spacing
  const insertLineBreak = useCallback(() => {
    insertFormatting('\n\n');
  }, [insertFormatting]);

  // Handle bold formatting
  const insertBold = useCallback(() => {
    insertFormatting('**', '**');
  }, [insertFormatting]);

  // Handle italic formatting
  const insertItalic = useCallback(() => {
    insertFormatting('*', '*');
  }, [insertFormatting]);

  // Handle text alignment (using markdown-style syntax)
  const insertCenterAlign = useCallback(() => {
    insertFormatting('\n<center>\n', '\n</center>\n');
  }, [insertFormatting]);

  // Handle enter key in textarea for smart bullet continuation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const lines = value.substring(0, start).split('\n');
      const currentLine = lines[lines.length - 1];
      
      // If current line starts with bullet point, continue with new bullet
      if (currentLine.trim().startsWith('• ')) {
        e.preventDefault();
        if (currentLine.trim() === '•') {
          // Remove empty bullet point
          const newValue = value.substring(0, start - 2) + value.substring(start);
          onChange(newValue);
          setTimeout(() => {
            textarea.setSelectionRange(start - 2, start - 2);
          }, 0);
        } else {
          insertFormatting('\n• ');
        }
      }
    }
  }, [value, onChange, insertFormatting]);

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${isFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''} ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertBold}
          className="h-8 w-8 p-0"
          title="Qalın (Bold)"
        >
          <Bold className="w-4 h-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertItalic}
          className="h-8 w-8 p-0"
          title="Əyik (Italic)"
        >
          <Italic className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertBulletPoint}
          className="h-8 w-8 p-0"
          title="Nöqtəli siyahı"
        >
          <List className="w-4 h-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertLineBreak}
          className="h-8 px-2 text-xs"
          title="Sətir aralığı əlavə et"
        >
          ↵↵
        </Button>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertCenterAlign}
          className="h-8 w-8 p-0"
          title="Mərkəzə düz"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Text Area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-3 resize-none focus:outline-none font-mono text-sm"
        style={{ minHeight: `${rows * 1.5}rem` }}
      />
      
      {/* Helper text */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
        <strong>Tövsiyələr:</strong> • nöqtəli siyahı, **qalın**, *əyik* mətn, Enter ilə yeni sətir
      </div>
    </div>
  );
}
