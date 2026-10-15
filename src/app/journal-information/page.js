import Journalinformation from "@/components/Journalinformation.jsx";

export const metadata = {
    title: "Journal Information | MPA Research",
    description:
        "Bibliographic and editorial details of MPA Research — an international, peer-reviewed, open-access multidisciplinary journal.",
};

export default function JournalInformationPage() {
    return (
        <main>
            <Journalinformation />
        </main>
    );
}