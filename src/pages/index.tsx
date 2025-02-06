
function Index() {

    return (
        <>





        </>
    )
}

export async function getServerSideProps() {
    const someData = "Buraya istediğiniz veriyi koyabilirsiniz!";
    return {
        props: {
            someData,
        },
    };
}
export default Index;