package com.example.online_blood_donation_mobile_application.activities

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.models.AmbulanceModel
import com.example.online_blood_donation_mobile_application.models.DonatorModel
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase

class AddAmbulance : AppCompatActivity() {

    private lateinit var Hname: EditText
    private lateinit var Location: EditText
    private lateinit var Contact: EditText
    private lateinit var asave: Button

    private lateinit var dbRef: DatabaseReference

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_ambulance)

        Hname = findViewById(R.id.Hname)
        Location = findViewById(R.id.Location)
        Contact = findViewById(R.id.Contact)
        asave = findViewById(R.id.asave)

        dbRef = FirebaseDatabase.getInstance().getReference("Ambulance")

        asave.setOnClickListener {
                saveAmbulanceData()
            }
    }
private fun saveAmbulanceData(){
    val name = Hname.text.toString()
    val location = Location.text.toString()
    val contact = Contact.text.toString()

    if(name.isEmpty()){
        Hname.error ="Please Enter Hospital Name"
    }
    if(location.isEmpty()){
        Location.error ="Please Enter Location Group"
    }
    if(contact.isEmpty()){
        Contact.error ="Please Enter Contact Number"
    }

    if(name.isNotEmpty() && location.isNotEmpty() && contact.isNotEmpty()){
        val ambulanceId = dbRef.push().key!!
        val ambulance = AmbulanceModel(ambulanceId, name, location, contact)

        dbRef.child(ambulanceId).setValue(ambulance).addOnCompleteListener {
            Toast.makeText(this,"Submit Ambulance Details Successfully !!! ", Toast.LENGTH_LONG).show()

            Hname.text.clear()
            Location.text.clear()
            Contact.text.clear()

        }.addOnFailureListener {err ->
            Toast.makeText(this,"Error ${err.message}", Toast.LENGTH_LONG).show()
        }
    }else{
        Toast.makeText(this,"Please Enter All Required Field !!", Toast.LENGTH_LONG).show()
    }
}

}