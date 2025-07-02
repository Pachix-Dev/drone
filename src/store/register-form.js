import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRegisterForm = create(
    persist(
        (set) => ({
            step: 0,
            user_id: "",
            name: "",
            paternSurname: "",
            maternSurname: "",
            email: "",
            phone: "",
            typeRegister: "",
            genre: "",
            nacionality: "",
            code_invitation: "",

            company: "",
            industry: "",
            position: "",
            area: "",
            country: "",
            municipality: "",
            state: "",
            city: "",
            address: "",
            colonias: [],
            colonia: "",
            postalCode: "",
            webPage: "",
            phoneCompany: "",

            eventKnowledge: "",
            productInterest: "",
            levelInfluence: "",
            wannaBeExhibitor: "",
            alreadyVisited: [],

            complete_register: false,
            invoiceDownToLoad: "",
            items: [
                {
                    id: 0,
                    name: "Costo del acceso",
                    name_en: "Access cost",
                    price: 300,
                    included: [
                        "Acceso a la feria los 3 días del evento",
                        "Acceso a conferencias Leaders of Tomorrow",
                        "Acceso a conferencias Transformation Area",
                    ],
                    included_en: [
                        "Access to the fair for 3 days of the event",
                        "Access to Leaders of Tomorrow conferences",
                        "Access to Transformation Area conferences",
                    ],
                }
            ],
            total: 300,
            code_cortesia: "",

            setUser_id: (user_id) => set({ user_id }),
            setName: (name) => set({ name }),
            setPaternSurname: (paternSurname) => set({ paternSurname }),
            setMaternSurname: (maternSurname) => set({ maternSurname }),
            setEmail: (email) => set({ email }),
            setPhone: (phone) => set({ phone }),
            setTypeRegister: (typeRegister) => set({ typeRegister }),
            setGenre: (genre) => set({ genre }),
            setNacionality: (nacionality) => set({ nacionality }),
            setCodeInvitation: (code_invitation) => set({ code_invitation }),

            setCompany: (company) => set({ company }),
            setIndustry: (industry) => set({ industry }),
            setPosition: (position) => set({ position }),
            setArea: (area) => set({ area }),
            setCountry: (country) => set({ country }),
            setMunicipality: (municipality) => set({ municipality }),
            setState: (state) => set({ state }),
            setCity: (city) => set({ city }),
            setAddress: (address) => set({ address }),
            setColonia: (colonia) => set({ colonia }),
            setColonias: (colonias) => set({ colonias }),
            setPostalCode: (postalCode) => set({ postalCode }),
            setWebPage: (webPage) => set({ webPage }),
            setPhoneCompany: (phoneCompany) => set({ phoneCompany }),

            setEventKnowledge: (eventKnowledge) => set({ eventKnowledge }),
            setProductInterest: (productInterest) => set({ productInterest }),
            setLevelInfluence: (levelInfluence) => set({ levelInfluence }),
            setWannaBeExhibitor: (wannaBeExhibitor) => set({ wannaBeExhibitor }),
            setAlreadyVisited: (alreadyVisited) => set({ alreadyVisited }),


            setCompleteRegister: (complete_register) => set({ complete_register }),
            setInvoiceDownToLoad: (invoiceDownToLoad) => set({ invoiceDownToLoad }),
            setCode_cortesia: (code_cortesia) => set({ code_cortesia }),

            addDiscount: (discount) =>
                set((state) => {
                    const exists = state.items.some((item) => item.id === discount.id);
                    if (exists) return state;

                    const exists_discount = state.items.some(
                        (item) => discount.isDiscount === item.isDiscount
                    );
                    if (exists_discount) return state;

                    const newTotal = state.total - discount.price;
                    return {
                        items: [...state.items, discount],
                        total: newTotal,
                    };
                }
            ),

            incrementStep: () => set((state) => ({
                step: state.step + 1
            })),
            decrementStep: () => set((state) => ({
                step: state.step - 1
            })),

            addTocart: (item) => set(() => ({
                item: { ...item }
            })),

            clear: () => set({
                step: 0,
                user_id: "",
                name: "",
                paternSurname: "",
                maternSurname: "",
                phone: "",
                typeRegister: "",
                genre: "",
                nacionality: "",
                code_invitation: "",

                company: "",
                industry: "",
                position: "",
                area: "",
                country: "",
                municipality: "",
                state: "",
                city: "",
                address: "",
                colonia: "",
                colonias: [],
                postalCode: "",
                webPage: "",
                phoneCompany: "",
                eventKnowledge: "",
                productInterest: "",
                levelInfluence: "",
                wannaBeExhibitor: "",
                alreadyVisited: [],
                code_cortesia: "",

                items: [
                    {
                    id: 0,
                    name: "Costo del acceso",
                    name_en: "Access cost",
                    price: 300,
                    included: [
                        "Acceso a la feria los 3 días del evento",
                        "Acceso a conferencias Leaders of Tomorrow",
                        "Acceso a conferencias Transformation Area",
                    ],
                    included_en: [
                        "Access to the fair for 3 days of the event",
                        "Access to Leaders of Tomorrow conferences",
                        "Access to Transformation Area conferences",
                    ],
                    },
                ],
                total: 300,
            })
        }),
        { name: "register-form-drone-new-3" }
    )
)

export { useRegisterForm };