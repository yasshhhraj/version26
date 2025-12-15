import {Sign_up_form} from "@/components/sign_up_form";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="w-full max-w-md px-8">
                <div className="flex flex-col items-center mb-12">
                    <h1
                        className="text-4xl font-bold tracking-wider mb-4"
                        style={{ fontFamily: "monospace", letterSpacing: "0.1em" }}
                    >
                        VERSI'IN
                    </h1>
                    <h2 className="text-xl text-gray-300">Sign up to Version'25</h2>
                </div>

                <Sign_up_form />
            </div>
        </div>
    )
}
