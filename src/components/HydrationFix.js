'use client';

import { useEffect } from 'react';

export default function HydrationFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Protect React DOM reconciliation against browser extensions & Google Translate
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child && child.parentNode !== this) {
        if (child.parentNode) {
          return child.parentNode.removeChild(child);
        }
        return child;
      }
      return originalRemoveChild.apply(this, arguments);
    };

    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        if (referenceNode.parentNode) {
          return referenceNode.parentNode.insertBefore(newNode, referenceNode);
        }
        return this.appendChild(newNode);
      }
      return originalInsertBefore.apply(this, arguments);
    };
  }, []);

  return null;
}

