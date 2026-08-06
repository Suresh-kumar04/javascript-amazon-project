import { formatCurrancy } from "../scripts/utils/money.js";
// describe for suite
describe('test suite : format Currancy',()=>{
    it('convert cents into dollars',()=>{
        expect(formatCurrancy(2095)).toEqual('20.95')
    })

    it('works with 0s',()=>{
        expect(formatCurrancy(0)).toEqual('0.00')
    })

    it('round up to the nearest cent',()=>{
        expect(formatCurrancy(2000.5)).toEqual('20.01')
    })
})