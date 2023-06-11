import { render } from '@testing-library/react';
import LandingPageCircle from './LandingPageCircle';
// import batmanDre from "../../image/batmanDre.jpeg";


describe('batman mask andre', () => {
    test('a pic of me in a batman mask', () => {
        render(<LandingPageCircle />)
        const testImage = document.querySelector("img") as HTMLImageElement;
        expect(testImage.alt).toContain("a pic of me in a batman mask");
    })

    test('a pic of me in a batman mask', () => {
        render(<LandingPageCircle />)
        const testImage = document.querySelector("img") as HTMLImageElement;
        expect(testImage.alt).toContain("a pic of me in a batman mask");
      })

})