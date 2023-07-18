package com.example.online_blood_donation_mobile_application.activities

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.models.DonatorModel
import com.google.firebase.database.FirebaseDatabase

class DonarDetails : AppCompatActivity() {

    private lateinit var tvName: TextView
    private lateinit var tvGroup: TextView
    private lateinit var tvAddress: TextView
    private lateinit var tvNumber: TextView
    private lateinit var tvStatus: TextView
    private lateinit var tvNic: TextView
    private lateinit var updatedonar : Button
    private lateinit var deleteDonar : Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_donar_details)

        initView()
        setValuesToViews()

        updatedonar.setOnClickListener {
            openUpdateDialog(
                intent.getStringExtra("donatorId").toString(),
                intent.getStringExtra("name").toString()
            )
        }

        deleteDonar.setOnClickListener {
            deleteRecord(
                intent.getStringExtra("donatorId").toString()
            )
        }
    }

    private fun initView() {
        tvName = findViewById(R.id.tvName)
        tvGroup = findViewById(R.id.tvGroup)
        tvAddress = findViewById(R.id.tvAddress)
        tvNumber = findViewById(R.id.tvNumber)
        tvStatus = findViewById(R.id.tvStatus)
        tvNic = findViewById(R.id.tvNic)
    }


    private fun setValuesToViews() {

      tvName.text = intent.getStringExtra("name")
        tvGroup.text = intent.getStringExtra("group")
        tvAddress.text = intent.getStringExtra("address")
        tvNumber.text = intent.getStringExtra("number")
        tvStatus.text = intent.getStringExtra("status")
        tvNic.text = intent.getStringExtra("nic")
        updatedonar = findViewById(R.id.updatedonar)
        deleteDonar = findViewById(R.id.deleteDonar)
    }

    private fun deleteRecord(
        id: String
    ){
        val dbRef = FirebaseDatabase.getInstance().getReference("Donator").child(id)
        val mTask = dbRef.removeValue()

        mTask.addOnSuccessListener {
            Toast.makeText(this, "Donar data deleted", Toast.LENGTH_LONG).show()

            val intent = Intent(this, Donarfeaching::class.java)
            finish()
            startActivity(intent)
        }.addOnFailureListener{ error ->
            Toast.makeText(this, "Deleting Err ${error.message}", Toast.LENGTH_LONG).show()
        }
    }

    @SuppressLint("MissingInflatedId")
    private fun  openUpdateDialog(
        donatorId: String,
        name: String
    ){
        val mDialog = AlertDialog.Builder(this)
        val inflater = layoutInflater
        val mDialogView = inflater.inflate(R.layout.activity_update_donar, null)

        mDialog.setView(mDialogView)

        val etStatus = mDialogView.findViewById<EditText>(R.id.etStatus)
        val etName = mDialogView.findViewById<TextView>(R.id.etName)
        val etGroup = mDialogView.findViewById<TextView>(R.id.etGroup)
        val etNumber = mDialogView.findViewById<TextView>(R.id.etNumber)
        val etAddress = mDialogView.findViewById<TextView>(R.id.etAddress)
        val etNic = mDialogView.findViewById<TextView>(R.id.etNic)
        val btnUpdateStatus = mDialogView.findViewById<Button>(R.id.btnUpdateStatus)
        val deleteDonar = mDialogView.findViewById<Button>(R.id.deleteDonar)

        etStatus.setText(intent.getStringExtra("status").toString())
        etName.setText(intent.getStringExtra("name").toString())
        etGroup.setText(intent.getStringExtra("group").toString())
        etNumber.setText(intent.getStringExtra("number").toString())
        etAddress.setText(intent.getStringExtra("address").toString())
        etNic.setText(intent.getStringExtra("nic").toString())

        mDialog.setTitle("Update Donar Status")

        val alertDialog = mDialog.create()
        alertDialog.show()

        btnUpdateStatus.setOnClickListener {
            updateDonarStatus(
                donatorId,
                etStatus.text.toString(),
                etName.text.toString(),
                etGroup.text.toString(),
                etNumber.text.toString(),
                etAddress.text.toString(),
                etNic.text.toString(),

                )
            Toast.makeText(applicationContext, "Donar Status Updated", Toast.LENGTH_LONG).show()

            //we are setting updated data to our textview
            tvName.text = etName.text.toString()
            tvGroup.text = etGroup.text.toString()
            tvNumber.text = etNumber.text.toString()
            tvAddress.text = etAddress.text.toString()
            tvStatus.text = etStatus.text.toString()


            alertDialog.dismiss()
        }


    }
        private fun updateDonarStatus(
            id: String,
            status: String,
            name: String,
            group: String,
            number: String,
            address: String,
            nic: String
        ) {
            val dbRef = FirebaseDatabase.getInstance().getReference("Donator").child(id)
            val empInfo = DonatorModel(id,name, group, address, number, nic, status)
            dbRef.setValue(empInfo)
        }

    }
