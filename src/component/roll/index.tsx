


export default function RollMaster({rollResult}: any) {


    return (
        <div>
            <p  style={{ whiteSpace: 'pre-wrap' }}>{rollResult}</p>
            <div style={{display: 'flex', gap: '25px', width: '100%', alignItems: 'center', marginTop: '25px'}}>
                <label style={{display: 'flex',flexDirection: 'column', fontWeight: '300',fontSize: '17px'}} htmlFor="dano">Rolagem</label>
            </div>
      </div>
    )
}