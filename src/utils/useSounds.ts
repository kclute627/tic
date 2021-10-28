import { useRef, useEffect } from "react";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useSettings } from "@context/Settings-context";
  type SoundType = 'pop1' | 'pop2' | 'win' | 'draw' | 'loss'
export default function useSounds(): (sound : SoundType) => void {
    const {settings} = useSettings()
    const popSoundRef = useRef<Audio.Sound | null>(null);
    const pop2SoundRef = useRef<Audio.Sound | null>(null);
    const winSoundRef = useRef<Audio.Sound | null>(null);
    const drawSoundRef = useRef<Audio.Sound | null>(null);
    const lossSoundRef = useRef<Audio.Sound | null>(null);


  

    const playSound =async (sound: SoundType): Promise<void> => {

        const soundsMap = {
            pop1: popSoundRef,
            pop2: pop2SoundRef,
            win: winSoundRef,
            draw: drawSoundRef,
            loss: lossSoundRef
        }

        try {
            const status = await soundsMap[sound].current?.getStatusAsync()

            status && status.isLoaded && settings?.sounds && soundsMap[sound].current?.replayAsync();
            if(settings?.haptics){

            
            switch (sound) {
                case "pop1":
                case 'pop2':
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                    
                    break;
                case "win":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
                    break
                case "loss":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
                    break
                case "draw":
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                    break
                default:
                    break;
            }
        }


        } catch (error) {
            console.log(error)
        }

    }
      useEffect(() => {
          /// load our sounds
          const popSoundObject = new Audio.Sound();
          const pop2SoundObject = new Audio.Sound();
          const winSoundObject = new Audio.Sound();
          const lossSoundObject = new Audio.Sound();
          const drawSoundObject = new Audio.Sound();

          const loadSounds = async () => {
              /* eslint-disable @typescript-eslint/no-var-requires */
              await popSoundObject.loadAsync(
                  require("@assets/assets_pop_1.wav")
              );
              popSoundRef.current = popSoundObject;

              await pop2SoundObject.loadAsync(
                  require("@assets/assets_pop_2.wav")
              );
              pop2SoundRef.current = pop2SoundObject;

              await lossSoundObject.loadAsync(
                  require("@assets/assets_loss.mp3")
              );
              lossSoundRef.current = lossSoundObject;

              await drawSoundObject.loadAsync(
                  require("@assets/assets_draw.mp3")
              );
              drawSoundRef.current = drawSoundObject;

              await winSoundObject.loadAsync(require("@assets/assets_win.mp3"));
              winSoundRef.current = winSoundObject;
          };
          loadSounds();

          return () => {
              // un load our sounds
              popSoundObject && popSoundObject.unloadAsync();
              pop2SoundObject && pop2SoundObject.unloadAsync();

              winSoundObject && winSoundObject.unloadAsync();
              lossSoundObject && lossSoundObject.unloadAsync();
              drawSoundObject && drawSoundObject.unloadAsync();
          };
      }, []);

      return playSound

}
