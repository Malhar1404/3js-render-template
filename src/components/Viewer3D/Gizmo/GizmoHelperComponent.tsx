import { GizmoHelper, GizmoViewcube } from '@react-three/drei';

export const GizmoHelperComponent = () => {
    return (
         <GizmoHelper
        alignment="bottom-right" // Position on screen: 'top-left', 'bottom-right', etc.
        margin={[80, 80]}        // Margin from the edge of the canvas
      >
        <GizmoViewcube 
          color="gray"          // Color of the cube faces
          hoverColor="darkgray" // Color when hovering over a face
          textColor="white"      // Color of the axis text (X, Y, Z)
          strokeColor="white"     // Color of the cube edges
        />
      </GizmoHelper>
    );
}