
import create from 'zustand';

const useStore = create((set: any) => ({
    color: 'white',
    changeColor: (newColor: any) => set(() => ({color: newColor})),
    lineWidth: 5,
    setLineWidth: (newLineWidth: any) => set(() => ({lineWidth: newLineWidth}))
}) )

export default useStore;